# fseek
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int fseek(FILE* stream, long offset, int origin);
}
```
* FILE[link file.md]

## 概要
ファイルストリームの現在位置を移動する。

基準位置`origin`から`offset`バイトの位置へ、次の入出力操作の位置を設定する。`origin`には以下のいずれかを指定する。

| 値 | 説明 |
|----|------|
| [`SEEK_SET`](seek_set.md) | ファイルの先頭 |
| [`SEEK_CUR`](seek_cur.md) | ファイルの現在位置 |
| [`SEEK_END`](seek_end.md) | ファイルの終端 |


## 戻り値
成功した場合は`0`を、失敗した場合は`0`以外を返す。


## 備考
- テキストモードで開いたストリームに対しては、`offset`は`0`であるか、[`ftell()`](ftell.md)が返した値でなければならない。また、その場合の`origin`は[`SEEK_SET`](seek_set.md)でなければならない
- この関数の呼び出しによって、ファイルの終端フラグはクリアされる
- [`ungetc()`](ungetc.md)で戻した文字は破棄される
- ファイルの位置をより移植性の高い形で扱うには、[`fgetpos()`](fgetpos.md)と[`fsetpos()`](fsetpos.md)を使用する


## 例
```cpp example
#include <cstdio>

int main()
{
  std::FILE* fp = std::fopen("test.txt", "w+");
  std::fputs("ABCDEF", fp);

  // ファイルの先頭から2バイトの位置へ移動する
  std::fseek(fp, 2, SEEK_SET);
  std::printf("%c\n", std::fgetc(fp));

  // 現在位置から1バイト進んだ位置へ移動する
  std::fseek(fp, 1, SEEK_CUR);
  std::printf("%c\n", std::fgetc(fp));

  // ファイルの終端から2バイト戻った位置へ移動する
  std::fseek(fp, -2, SEEK_END);
  std::printf("%c\n", std::fgetc(fp));

  std::fclose(fp);
}
```
* std::fseek[color ff0000]
* std::fopen[link fopen.md]
* std::fclose[link fclose.md]
* std::fputs[link fputs.md]
* std::fgetc[link fgetc.md]
* std::printf[link printf.md]
* std::FILE[link file.md]
* SEEK_SET[link seek_set.md]
* SEEK_CUR[link seek_cur.md]
* SEEK_END[link seek_end.md]

### 出力
```
C
E
E
```


## 関連項目
- [`ftell`](ftell.md)
- [`rewind`](rewind.md)
- [`fgetpos`](fgetpos.md)
- [`fsetpos`](fsetpos.md)
