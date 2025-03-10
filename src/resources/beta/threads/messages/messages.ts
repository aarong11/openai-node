// File generated from our OpenAPI spec by Stainless.

import * as Core from 'openai/core';
import { APIResource } from 'openai/resource';
import { isRequestOptions } from 'openai/core';
import * as MessagesAPI from 'openai/resources/beta/threads/messages/messages';
import * as FilesAPI from 'openai/resources/beta/threads/messages/files';
import { CursorPage, type CursorPageParams } from 'openai/pagination';

export class Messages extends APIResource {
  files: FilesAPI.Files = new FilesAPI.Files(this.client);

  /**
   * Create a Message.
   */
  create(
    threadId: string,
    body: MessageCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ThreadMessage> {
    return this.post(`/threads/${threadId}/messages`, {
      body,
      ...options,
      headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
    });
  }

  /**
   * Retrieve a Message.
   */
  retrieve(
    threadId: string,
    messageId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ThreadMessage> {
    return this.get(`/threads/${threadId}/messages/${messageId}`, {
      ...options,
      headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
    });
  }

  /**
   * Modifies a Message.
   */
  update(
    threadId: string,
    messageId: string,
    body: MessageUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ThreadMessage> {
    return this.post(`/threads/${threadId}/messages/${messageId}`, {
      body,
      ...options,
      headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
    });
  }

  /**
   * Returns a list of Messages for a given Thread.
   */
  list(
    threadId: string,
    query?: MessageListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ThreadMessagesPage, ThreadMessage>;
  list(threadId: string, options?: Core.RequestOptions): Core.PagePromise<ThreadMessagesPage, ThreadMessage>;
  list(
    threadId: string,
    query: MessageListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ThreadMessagesPage, ThreadMessage> {
    if (isRequestOptions(query)) {
      return this.list(threadId, {}, query);
    }
    return this.getAPIList(`/threads/${threadId}/messages`, ThreadMessagesPage, {
      query,
      ...options,
      headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
    });
  }
}

export class ThreadMessagesPage extends CursorPage<ThreadMessage> {}

/**
 * References an image [File](https://platform.openai.com/docs/api-reference/files)
 * in the content of a Message.
 */
export interface MessageContentImageFile {
  image_file: MessageContentImageFile.ImageFile;

  /**
   * Will always be `image_file`.
   */
  type: 'image_file';
}

export namespace MessageContentImageFile {
  export interface ImageFile {
    /**
     * The [File](https://platform.openai.com/docs/api-reference/files) ID of the image
     * in the Message content.
     */
    file_id: string;
  }
}

/**
 * The text content that is part of a Message.
 */
export interface MessageContentText {
  text: MessageContentText.Text;

  /**
   * Will always be `text`.
   */
  type: 'text';
}

export namespace MessageContentText {
  export interface Text {
    annotations: Array<Text.FileCitation | Text.FilePath>;

    /**
     * The data that makes up the text.
     */
    value: string;
  }

  export namespace Text {
    /**
     * A citation within the Message that points to a specific quote from a specific
     * File associated with the Assistant or the Message. Generated when the Assistant
     * uses the "retrieval" tool to search files.
     */
    export interface FileCitation {
      end_index: number;

      file_citation: FileCitation.FileCitation;

      start_index: number;

      /**
       * The text in the Message content that needs to be replaced.
       */
      text: string;

      /**
       * Will always be `file_citation`.
       */
      type: 'file_citation';
    }

    export namespace FileCitation {
      export interface FileCitation {
        /**
         * The ID of the specific File the citation is from.
         */
        file_id: string;

        /**
         * The specific quote in the File.
         */
        quote: string;
      }
    }

    /**
     * A URL for the File that's generated when the Assistant used the
     * `code_interpreter` tool to generate a File.
     */
    export interface FilePath {
      end_index: number;

      file_path: FilePath.FilePath;

      start_index: number;

      /**
       * The text in the Message content that needs to be replaced.
       */
      text: string;

      /**
       * Will always be `file_path`.
       */
      type: 'file_path';
    }

    export namespace FilePath {
      export interface FilePath {
        /**
         * The ID of the File that was generated.
         */
        file_id: string;
      }
    }
  }
}

/**
 * Represents a Message within a
 * [Thread](https://platform.openai.com/docs/api-reference/threads).
 */
export interface ThreadMessage {
  /**
   * The identifier, which can be referenced in API endpoints.
   */
  id: string;

  /**
   * If applicable, the ID of the
   * [Assistant](https://platform.openai.com/docs/api-reference/assistants) that
   * authored this Message.
   */
  assistant_id: string | null;

  /**
   * The content of the Message in array of text and/or images.
   */
  content: Array<MessageContentImageFile | MessageContentText>;

  /**
   * The Unix timestamp (in seconds) for when the Message was created.
   */
  created_at: number;

  /**
   * A list of [file](https://platform.openai.com/docs/api-reference/files) IDs that
   * the Assistant should use. Useful for tools like retrieval and code_interpreter
   * that can access files. A maximum of 10 files can be attached to a Message.
   */
  file_ids: Array<string>;

  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format. Keys
   * can be a maximum of 64 characters long and values can be a maxium of 512
   * characters long.
   */
  metadata: unknown | null;

  /**
   * The object type, which is always `thread.message`.
   */
  object: 'thread.message';

  /**
   * The entity that produced the Message. One of `user` or `assistant`.
   */
  role: 'user' | 'assistant';

  /**
   * If applicable, the ID of the
   * [Run](https://platform.openai.com/docs/api-reference/runs) associated with the
   * authoring of this Message.
   */
  run_id: string | null;

  /**
   * The [Thread](https://platform.openai.com/docs/api-reference/threads) ID that
   * this Message belongs to.
   */
  thread_id: string;
}

export interface ThreadMessageDeleted {
  id: string;

  deleted: boolean;

  object: 'thread.message.deleted';
}

export interface MessageCreateParams {
  /**
   * The content of the Message.
   */
  content: string;

  /**
   * The role of the entity that is creating the Message. Currently only `user` is
   * supported.
   */
  role: 'user';

  /**
   * A list of [File](https://platform.openai.com/docs/api-reference/files) IDs that
   * the Message should use. There can be a maximum of 10 files attached to a
   * Message. Useful for tools like `retrieval` and `code_interpreter` that can
   * access and use files.
   */
  file_ids?: Array<string>;

  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format. Keys
   * can be a maximum of 64 characters long and values can be a maxium of 512
   * characters long.
   */
  metadata?: unknown | null;
}

export interface MessageUpdateParams {
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format. Keys
   * can be a maximum of 64 characters long and values can be a maxium of 512
   * characters long.
   */
  metadata?: unknown | null;
}

export interface MessageListParams extends CursorPageParams {
  /**
   * A cursor for use in pagination. `before` is an object ID that defines your place
   * in the list. For instance, if you make a list request and receive 100 objects,
   * ending with obj_foo, your subsequent call can include before=obj_foo in order to
   * fetch the previous page of the list.
   */
  before?: string;

  /**
   * Sort order by the `created_at` timestamp of the objects. `asc` for ascending
   * order and `desc` for descending order.
   */
  order?: 'asc' | 'desc';
}

export namespace Messages {
  export import MessageContentImageFile = MessagesAPI.MessageContentImageFile;
  export import MessageContentText = MessagesAPI.MessageContentText;
  export import ThreadMessage = MessagesAPI.ThreadMessage;
  export import ThreadMessageDeleted = MessagesAPI.ThreadMessageDeleted;
  export import ThreadMessagesPage = MessagesAPI.ThreadMessagesPage;
  export import MessageCreateParams = MessagesAPI.MessageCreateParams;
  export import MessageUpdateParams = MessagesAPI.MessageUpdateParams;
  export import MessageListParams = MessagesAPI.MessageListParams;
  export import Files = FilesAPI.Files;
  export import MessageFile = FilesAPI.MessageFile;
  export import MessageFilesPage = FilesAPI.MessageFilesPage;
  export import FileListParams = FilesAPI.FileListParams;
}
