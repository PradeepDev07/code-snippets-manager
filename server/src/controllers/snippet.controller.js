import * as snippetService from "../services/snippet.service.js";

export const createSnippet = async (req, res, next) => {
  try {
    const snippet = await snippetService.createSnippet(req.user.id, req.body);
    res.status(201).json(snippet);
  } catch (err) {
    next(err);
  }
};

export const getMySnippets = async (req, res, next) => {
  try {

    const snippets = await snippetService.getUserSnippets(req.user.id);
    res.json(snippets);
  } catch (err) {
    next(err);
  }
};

export const getPublicSnippets = async (req, res, next) => {
  try {
    const snippets = await snippetService.getPublicSnippetsDB();
    res.json(snippets);
  } catch (err) {
    next(err);
  }
};

export const getSnippetsByTag = async (req, res, next) => {
  try {
    const tag = req.params.tag;
    const snippets = await snippetService.getSnippetsByTag(tag);
    res.json(snippets);
  } catch (err) {
    next(err);
  }
}

export const updateSnippet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const snippet = await snippetService.updateSnippet(id, req.body);
    res.json(snippet);
  } catch (err) {
    next(err);
  }
};

export const deleteSnippet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await snippetService.deleteSnippet(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const searchSnippets = async (req, res, next) => {
  try {
    const snippets = await snippetService.searchSnippets(req.query);
    res.json(snippets);
  } catch (err) {
    next(err);
  }
};

// New Controller for Limited Public Snippets with no authentication required
export const getLimitedPublicSnippets = async (req, res, next) => {
  try {
    const snippets = await snippetService.getLimitedPublicSnippets();
    res.json(snippets);
  } catch (err) {
    next(err);
  }
};








































// export const getSnippetsByUsername = async (req, res, next) => {
//   try {
//     const username = req.params.username;
//     const user = await snippetService.getUserByUsername(username);
//     const snippets = await snippetService.getUserSnippets(user.id);
//     res.json(snippets);
//   } catch (err) {
//     next(err);
//   }
// };