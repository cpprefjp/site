# SEEK_CUR
* cstdio[meta header]
* macro[meta id-type]

```cpp
#define SEEK_CUR unspecified
```
* unspecified[italic]

## 概要
ファイルの現在位置を指定するための整数定数。

現在の読み書き位置からのオフセットとして位置を指定する。

[`fseek()`](fseek.md)関数の`origin`引数として指定する。値は処理系定義の整数定数式であり、`SEEK_SET`・`SEEK_CUR`・`SEEK_END`は互いに異なる値をもつ。


## 例
```cpp example
#include <cstdio>

int main()
{
  std::FILE* fp = std::fopen("test.txt", "wb+");
  std::fputs("ABCDEF", fp);

  // 現在位置（6バイト目）から2バイト戻った位置へ移動する
  std::fseek(fp, -2, SEEK_CUR);
  std::printf("%ld\n", std::ftell(fp));

  std::fclose(fp);
}
```
* SEEK_CUR[color ff0000]
* std::fseek[link fseek.md]
* std::ftell[link ftell.md]
* std::fopen[link fopen.md]
* std::fclose[link fclose.md]
* std::fputs[link fputs.md]
* std::printf[link printf.md]
* std::FILE[link file.md]

### 出力
```
4
```


## 関連項目
- [`fseek`](fseek.md)
- [`ftell`](ftell.md)
