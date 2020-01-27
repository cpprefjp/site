# filesystem
* filesystem[meta header]
* cpp17[meta cpp]

`<filesystem>`ヘッダは、OSのファイルシステムを操作するAPIを提供する。

このライブラリでは、ファイル、ディレクトリ、シンボリックリンクなどを操作する。また、それらを総称してエンティティと呼ぶ。


## パス

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`path`](filesystem/path.md) | ファイルシステムのパスを扱うクラス (class) | C++17 |
| [`filesystem_error`](filesystem/filesystem_error.md) | ファイルシステム操作で起きたエラーを表す例外クラス (class) | C++17 |
| [`directory_entry`](filesystem/directory_entry.md) | ディレクト内の要素を表すクラス (class) | C++17 |
| [`directory_iterator`](filesystem/directory_iterator.md) | ディレクトリ内を走査するイテレータクラス (class) | C++17 |
| [`recursive_directory_iterator`](filesystem/recursive_directory_iterator.md) | ディレクトリ内を再帰的に走査するイテレータクラス (class) | C++17 |


## ファイルシステム情報

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`file_status`](filesystem/file_status.md) | ファイル状態を表すクラス (class) | C++17 |
| [`space_info`](filesystem/space_info.md) | 指定されたパスの容量を表すクラス (class) | C++17 |
| [`file_type`](filesystem/file_type.md) | ファイル種別を表す列挙型 (enum) | C++17 |
| [`perms`](filesystem/perms.md) | 権限を表す列挙型 (enum) | C++17 |
| [`perm_options`](filesystem/perm_options.md) | 権限オプションを表す列挙型 (enum) | C++17 |
| [`copy_options`](filesystem/copy_options.md) | コピーオプションを表す列挙型 (enum) | C++17 |
| [`directory_options`](filesystem/directory_options.md) | ディレクトリオプションを表す列挙型 (enum) | C++17 |
| [`file_time_type`](filesystem/file_time_type.md) | ファイル情報で使用する時間の型 (type alias) | C++17 |


## ファイルシステム操作
### パス操作

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`current_path`](filesystem/current_path.md) | 現在の作�ディレクトリを取得・�定する (function) | C++17 |
| [`temp_directory_path`](filesystem/temp_directory_path.md) | 一時ファイル用ディレクトリのパスを取得する (function) | C++17 |
| [`absolute`](filesystem/absolute.md) | パスを絶対パスに変換する (function) | C++17 |
| [`canonical`](filesystem/canonical.md) | パスを�規化する (function) | C++17 |
| [`weakly_canonical`](filesystem/weakly_canonical.md) | `canonical`よりも弱い要件でパスを�規化する (function) | C++17 |
| [`read_symlink`](filesystem/read_symlink.md) | シンボリックリンクが指すパスを取得する (function) | C++17 |
| [`relative`](filesystem/relative.md) | パスを現在の作�ディレクトリからの相対パスに変換する (function) | C++17 |
| [`proximate`](filesystem/proximate.md) | パスを現在の作�ディレクトリからの相対パスに変換する (function) | C++17 |


### エンティティ操作

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`copy`](filesystem/copy.md) | コピーする (function) | C++17 |
| [`copy_file`](filesystem/copy_file.md) | ファイルをコピーする (function) | C++17 |
| [`copy_symlink`](filesystem/copy_symlink.md) | シンボリックリンクをコピーする (function) | C++17 |
| [`create_directory`](filesystem/create_directory.md) | ディレクトリを作成する (function) | C++17 |
| [`create_directories`](filesystem/create_directories.md) | ディレクトリ階層を作成する (function) | C++17 |
| [`create_directory_symlink`](filesystem/create_directory_symlink.md) | ディレクトリに対するシンボリックリンクを作成する (function) | C++17 |
| [`create_hard_link`](filesystem/create_hard_link.md) | ハードリンクを作成する (function) | C++17 |
| [`create_symlink`](filesystem/create_symlink.md) | シンボリックリンクを作成する (function) | C++17 |
| [`permissions`](filesystem/permissions.md) | 権限を�定する (function) | C++17 |
| [`remove`](filesystem/remove.md) | ファイル・ディレクトリを削除する (function) | C++17 |
| [`remove_all`](filesystem/remove_all.md) | 再帰的にファイル・ディレクトリを削除する (function) | C++17 |
| [`rename`](filesystem/rename.md) | ファイル・ディレクトリを名称変更・移動する (function) | C++17 |
| [`resize_file`](filesystem/resize_file.md) | ファイルサイズを変更する (function) | C++17 |


### エンティティ情報

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`exists`](filesystem/exists.md) | ファイルが�在するか確認する (function) | C++17 |
| [`equivalent`](filesystem/equivalent.md) | 2つのエンティティが�価かを確認する (function) | C++17 |
| [`file_size`](filesystem/file_size.md) | ファイルサイズを取得する (function) | C++17 |
| [`hard_link_count`](filesystem/hard_link_count.md) | ハードリンク数を取得する (function) | C++17 |
| [`is_regular_file`](filesystem/is_regular_file.md) | 指定されたパスが通常ファイルを指しているかを確認する (function) | C++17 |
| [`is_directory`](filesystem/is_directory.md) | 指定されたパスがディレクトリを指しているかを確認する (function) | C++17 |
| [`is_symlink`](filesystem/is_symlink.md) | 指定されたパスがシンボリックリンクを指しているかを確認する (function) | C++17 |
| [`is_block_file`](filesystem/is_block_file.md) | 指定されたパスがブ�ックデバイスのスペシャルファイルを指しているかを確認する (function) | C++17 |
| [`is_character_file`](filesystem/is_character_file.md) | 指定されたパスが�ャラクタデバイスのスペシャルファイルを指しているかを確認する (function) | C++17 |
| [`is_fifo`](filesystem/is_fifo.md) | 指定されたパスがFIFOもしくはパイプを指しているかを確認する (function) | C++17 |
| [`is_socket`](filesystem/is_socket.md) | 指定されたパスがソケットを指しているかを確認する (function) | C++17 |
| [`is_other`](filesystem/is_other.md) | 指定されたパスが�在していない、もしくはシステム依�の種別のファイルを指しているかを確認する (function) | C++17 |
| [`is_empty`](filesystem/is_empty.md) | 指定されたパスが空のファイル・ディレクトリかを確認する (function) | C++17 |
| [`last_write_time`](filesystem/last_write_time.md) | エンティティの最終更新日を取得・更新する (function) | C++17 |
| [`space`](filesystem/space.md) | 指定されたパスの残り容量を取得する (function) | C++17 |
| [`status`](filesystem/status.md) | ファイル状態を取得する (function) | C++17 |
| [`symlink_status`](filesystem/symlink_status.md) | シンボリックリンクの状態を取得する (function) | C++17 |
| [`status_known`](filesystem/status_known.md) | ファイルが既知の状態かを確認する (function) | C++17 |


## バージョン
### 言語
- C++17

### 備考
- いくつかの処理系バージョンでは、ファイルシステムライブラリを別途リンクする必要がある
    - GCC 8.1では、リンクオプションとして`-lstdc++fs`が必要
    - Clang 7.0では、リンクオプションとして`-lc++fs`が必要


## 参照
- [P0218R1 Adopt the File System TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0218r1.html)
- [P0219R1 Relative Paths for Filesystem](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0219r1.html)
- [P0492R2 Proposed Resolution of C++17 National Body Comments for Filesystems(R2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0492r2.html)
