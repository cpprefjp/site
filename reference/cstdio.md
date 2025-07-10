# cstdio
* cstdio[meta header]

`<cstdio>`ヘッダでは、標準入出力のための機能を定義する。これらの機能は、`std`名前空間に属することを除いてC言語の標準ライブラリ`<stdio.h>`ヘッダと同じである。


## 型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`size_t`](/reference/cstddef/size_t.md) | 符号なし整数型 | |
| [`FILE`](/reference/cstdio/file.md) | ストリームの制御に必要な情報を持つオブジェクト型 | |
| [`fpos_t`](/reference/cstdio/fpos_t.md.nolink) | ファイルの全ての位置にアクセスするための配列以外の完全オブジェクト型 | |


## マクロ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`NULL`](/reference/cstddef/null.md) | ヌルポインタ定数に展開されるマクロ | |
| [`_IOFBF`](/reference/cstdio/iofbf.md.nolink) | 入出力を完全にバッファリングする指定のための整数定数 | |
| [`_IOLBF`](/reference/cstdio/iolbf.md.nolink) | 入出力を行バッファリングする指定のための整数定数 | |
| [`_IONBF`](/reference/cstdio/ionbf.md.nolink) | 入出力をバッファリングしない指定のための整数定数 | |
| [`BUFSIZ`](/reference/cstdio/bufsiz.md.nolink) | バッファサイズを表す整数定数 | |
| [`EOF`](/reference/cstdio/eof.md)    | ファイルの終端であることを表す`int`型の整数定数 | |
| [`FOPEN_MAX`](/reference/cstdio/fopen_max.md.nolink)    | 実装によって保証されるファイルを開ける最低限の数を表す整数定数 | |
| [`FILENAME_MAX`](/reference/cstdio/filename_max.md) | 実装によって保証されるファイル名の最大の長さを表す整数定数 | |
| [`L_tmpnam`](/reference/cstdio/l_tmpnam.md.nolink) | `tmpnam()`関数によって作られた一時ファイル名を保持する似に必要な長さを表す整数定数 | |
| [`SEEK_SET`](/reference/cstdio/seek_set.md.nolink) | ファイルの先頭位置を指定するための整数定数 | |
| [`SEEK_CUR`](/reference/cstdio/seek_cur.md.nolink) | ファイルの現在位置を指定するための整数定数 | |
| [`SEEK_END`](/reference/cstdio/seek_end.md.nolink) | ファイルの終端を指定するための整数定数 | |
| [`TMP_MAX`](/reference/cstdio/tmp_max.md.nolink)  | `tempnam()`関数によって生成できる一時ファイル名の、実装が保証する最低限の数を表す整数定数 | |
| [`stderr`](/reference/cstdio/stderr.md)   | 標準エラーを表す`FILE*`型の式 |
| [`stdin`](/reference/cstdio/stdin.md)    | 標準入力を表す`FILE*`型の式 |
| [`stdout`](/reference/cstdio/stdout.md)   | 標準出力を表す`FILE*`型の式 |


## ファイル操作

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`remove`](/reference/cstdio/remove.md)   | ファイルを削除する | |
| [`rename`](/reference/cstdio/rename.md)   | ファイル名を変更、ファイルを移動する | |
| [`tmpfile`](/reference/cstdio/tmpfile.md)  | 一時ファイルを生成する | |
| [`tmpnam`](/reference/cstdio/tmpnam.md) | 一時ファイル名を生成する | |
| [`fclose`](/reference/cstdio/fclose.md)   | ファイルを閉じる | |
| [`fopen`](/reference/cstdio/fopen.md)    | ファイルを開く | |
| [`fflush`](/reference/cstdio/fflush.md)   | ファイルをフラッシュする | |
| [`fprintf`](/reference/cstdio/fprintf.md)  | 書式を指定してファイルに出力する | |
| [`fscanf`](/reference/cstdio/fscanf.md)   | 書式を指定してファイルから入力する | |
| [`vfprintf`](/reference/cstdio/vfprintf.md.nolink) | 可変引数リスト`va_list`を使用し、書式を指定してファイルに出力する | |
| [`vfscanf`](/reference/cstdio/vfscanf.md.nolink)  | 可変引数リスト`va_list`を使用し、書式を指定してファイルから入力する | C++17 |
| [`fgetc`](/reference/cstdio/fgetc.md)    | ファイルから1文字入力する | |
| [`fgets`](/reference/cstdio/fgets.md)    | ファイルからN文字入力する | |
| [`fputc`](/reference/cstdio/fputc.md)    | ファイルに1文字出力する | |
| [`fputs`](/reference/cstdio/fputs.md)    | ファイルにN文字出力する | |
| [`fread`](/reference/cstdio/fread.md.nolink)    | ファイルからN文字読み込む | |
| [`fwrite`](/reference/cstdio/fwrite.md.nolink)   | ファイルにN文字書き込む | |
| [`fgetpos`](/reference/cstdio/fgetpos.md.nolink)  | ファイルの現在位置を取得する | |
| [`fseek`](/reference/cstdio/fseek.md.nolink)    | ファイルの現在位置を移動する | |
| [`fsetpos`](/reference/cstdio/fsetpos.md.nolink)  | ファイルの現在位置を設定する | |
| [`ftell`](/reference/cstdio/ftell.md.nolink)    | ファイルの現在位置を取得する | |
| [`rewind`](/reference/cstdio/rewind.md.nolink)   | ファイルの現在位置を先頭に戻し、エラーや終端判定をクリアする | |
| [`clearerr`](/reference/cstdio/clearerr.md.nolink) | エラーをクリアする | |
| [`feof`](/reference/cstdio/feof.md)     | ファイルが終端に到達したか判定する | |
| [`ferror`](/reference/cstdio/ferror.md.nolink)   | ファイルストリームがエラー状態かを判定する | |
| [`perror`](/reference/cstdio/perror.md.nolink)   | システムエラーメッセージを出力する | |


## 標準入出力

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`printf`](/reference/cstdio/printf.md)  | 書式を指定して標準出力に出力する | |
| [`scanf`](/reference/cstdio/scanf.md)   | 書式を指定して標準入力から入力する | |
| [`vprintf`](/reference/cstdio/vprintf.md.nolink) | 可変引数リスト`va_list`を使用し、書式を指定して標準出力に出力する | |
| [`vscanf`](/reference/cstdio/vscanf.md.nolink)  | 可変引数リスト`va_list`を使用し、書式を指定して標準入力から入力する | |
| [`getc`](/reference/cstdio/getc.md.nolink)    | ストリームから1文字入力する | |
| [`getchar`](/reference/cstdio/getchar.md.nolink) | 標準入力から1文字入力する | |
| [`putc`](/reference/cstdio/putc.md.nolink)    | ストリームに1文字出力する | |
| [`putchar`](/reference/cstdio/putchar.md.nolink) | 標準出力に1文字出力する | |
| [`puts`](/reference/cstdio/puts.md.nolink)    | 標準出力に文字列を出力する | |
| [`ungetc`](/reference/cstdio/ungetc.md.nolink)  | 入力ストリームに1文字戻す | |


## 文字列入出力

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`snprintf`](/reference/cstdio/snprintf.md.nolink)  | 書式と文字数を指定して、文字列領域に出力する | |
| [`sprintf`](/reference/cstdio/sprintf.md.nolink)   | 書式を指定して文字列領域に出力する | |
| [`sscanf`](/reference/cstdio/sscanf.md.nolink)    | 書式を指定して文字列領域から入力する | |
| `vsnprintf` | 可変引数リスト`va_list`を使用し、書式と文字数を指定して、文字列領域に出力する | |
| [`vsprintf`](/reference/cstdio/vsprintf.md.nolink)  | 可変引数リスト`va_list`を使用し、書式を指定して文字列領域に出力する | |
| [`vsscanf`](/reference/cstdio/vsscanf.md.nolink)   | 可変引数リスト`va_list`を使用し、書式を指定して文字列領域から入力する | |


## バッファ操作

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`setbuf`](/reference/cstdio/setbuf.md.nolink)  | 入出力用のバッファを設定する | |
| [`setvbuf`](/reference/cstdio/setvbuf.md.nolink) | 戦略を指定して入出力用のバッファを設定する | |


## 参照
- [P0063R3 C++17 should refer to C11 instead of C99](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0063r3.html)
- [P0175R1 Synopses for the C library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0175r1.html)
