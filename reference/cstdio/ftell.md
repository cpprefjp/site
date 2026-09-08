# ftell
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  long ftell(FILE* stream);
}
```
* FILE[link file.md]

## 概要
ファイルストリームの現在位置を取得する。


## 戻り値
成功した場合は現在位置を返す。バイナリモードで開いたストリームでは、ファイルの先頭からのバイト数となる。

失敗した場合は`-1L`を返し、[`errno`](/reference/cerrno/errno.md)に処理系定義の値を設定する。


## 備考
- テキストモードで開いたストリームでは、戻り値はバイト数とは限らない処理系定義の値となる。その値は[`fseek()`](fseek.md)の`offset`引数として、基準位置[`SEEK_SET`](seek_set.md)とともに使用できる


## 例
```cpp example
#include <cstdio>

int main()
{
  std::FILE* fp = std::fopen("test.txt", "wb+");
  std::fputs("ABCDEF", fp);

  // 書き込み後の現在位置を取得する
  std::printf("%ld\n", std::ftell(fp));

  std::fseek(fp, 2, SEEK_SET);
  std::printf("%ld\n", std::ftell(fp));

  std::fclose(fp);
}
```
* std::ftell[color ff0000]
* std::fopen[link fopen.md]
* std::fclose[link fclose.md]
* std::fputs[link fputs.md]
* std::fseek[link fseek.md]
* std::printf[link printf.md]
* std::FILE[link file.md]
* SEEK_SET[link seek_set.md]

### 出力
```
6
2
```


## 関連項目
- [`fseek`](fseek.md)
- [`fgetpos`](fgetpos.md)
