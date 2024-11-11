import domo from "ryuu.js";
import Download from "downloadjs";

const BASE_URL = "/domo/datastores/v1";

const GetCurrentUser = () => {
  return domo
    .get("/domo/environment/v1")
    .then((user) => ({
      ...user,
      displayName: user.userName,
      avatarKey: `/domo/avatars/v2/USER/${user.userId}`,
    }))
    .catch((error) => {
      console.error("Error creating document:", error);
      throw error;
    });
};

const GetUser = (userId) => {
  return domo
    .get(`/domo/users/v1/${userId}?includeDetails=true`)
    .then((user) => ({ ...user, userName: user.displayName }))
    .catch((error) => {
      console.error("Error creating document:", error);
      throw error;
    });
};

const CreateDocument = (collectionName, document) => {
  console.log(document);
  console.log(collectionName);

  return domo
    .post(`${BASE_URL}/collections/${collectionName}/documents/`, {
      content: document,
    })
    .then((response) => response)
    .catch((error) => {
      console.error("Error creating document:", error);
      throw error;
    });
};

const ListDocuments = (collectionName) => {
  return domo
    .get(`${BASE_URL}/collections/${collectionName}/documents/`)
    .then((response) => response)
    .catch((error) => {
      console.error("Error listing documents:", error);
      throw error;
    });
};

const GetDocument = (collectionName, documentId) => {
  return domo
    .get(`${BASE_URL}/collections/${collectionName}/documents/${documentId}`)
    .then((response) => response)
    .catch((error) => {
      console.error("Error getting document:", error);
      throw error;
    });
};

const UpdateDocument = (collectionName, documentId, document) => {
  return domo
    .put(`${BASE_URL}/collections/${collectionName}/documents/${documentId}`, {
      content: document,
    })
    .then((response) => response)
    .catch((error) => {
      console.error("Error updating document:", error);
      throw error;
    });
};

const DeleteDocument = (collectionName, documentId) => {
  return domo
    .delete(`${BASE_URL}/collections/${collectionName}/documents/${documentId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error deleting document:", error);
      throw error;
    });
};

const QueryDocument = (collectionName, body) => {
  return domo
    .post(`${BASE_URL}/collections/${collectionName}/documents/query `, body)
    .then((response) => response)
    .catch((error) => {
      console.error("Error updating document:", error);
      throw error;
    });
};

const BulkDeleteDocuments = (collectionName, ids) => {
  return domo
    .delete(
      `${BASE_URL}/collections/${collectionName}/documents/bulk?ids=${ids}`
    )
    .then((response) => response)
    .catch((error) => {
      console.error("Error bulk deleting documents:", error);
      throw error;
    });
};

const UploadFile = (file, name, description = "", isPublic = false) => {
  const formData = new FormData();
  formData.append("file", file);
  const url = `/domo/data-files/v1?name=
             ${name}&description=${description}&public=${isPublic}`;
  const options = { contentType: "multipart" };
  return domo
    .post(url, formData, options)
    .then((response) => response)
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const UploadRevision = (file, fileId) => {
  const formData = new FormData();
  formData.append("file", file);
  const url = `/domo/data-files/v1/${fileId}`;
  const options = { contentType: "multipart" };
  return domo
    .put(url, formData, options)
    .then((response) => response)
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const DownloadFile = (fileId, filename, revisionId) => {
  const options = { responseType: "blob" };
  const url = `/domo/data-files/v1/${fileId}${
    revisionId ? `/revisions/${revisionId}` : ""
  }`;
  return domo
    .get(url, options)
    .then((data) => {
      Download(data, filename);
    })
    .then((response) => response)
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const GetFile = (fileId, revisionId) => {
  const options = { responseType: "blob" };
  const url = `/domo/data-files/v1/${fileId}${
    revisionId ? `/revisions/${revisionId}` : ""
  }`;
  return domo
    .get(url, options)
    .then((data) => data)
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const DomoApi = {
  GetCurrentUser,
  GetUser,
  CreateDocument,
  ListDocuments,
  DeleteDocument,
  BulkDeleteDocuments,
  GetDocument,
  UpdateDocument,
  QueryDocument,
  UploadFile,
  UploadRevision,
  DownloadFile,
  GetFile,
};

export default DomoApi;
