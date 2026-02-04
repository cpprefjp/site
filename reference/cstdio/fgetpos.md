# fgetpos
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int fgetpos(FILE* stream, fpos_t* pos);
}
```

## 概要
ファイルの現在位置を取得する。

## 戻り値
正常に実行されれば0を返す。

失敗した場合は、0以外を返し、エラーの内容は[`errno`](/reference/cerrno/errno.md)から参照することができる。

## この機能が必要になった背景・経緯
かつては[`ftell`](/reference/cstdio/ftell.md.nolink)で位置を取得していたが、`ftell`は位置を`long int`で返すため、非常に大きなファイルやマルチバイト文字を含む特殊なファイルでは正確に表現できないことがあった。

そこで、どのようなファイルでも位置を正確に表現できる`fpos_t`型が導入されたことに伴い、この関数が登場した。

## 例
```cpp example
#include <iostream>
#include <cstdio>

int main() {
    std::FILE *file=std::fopen("example.txt", "w");
    if (file == nullptr) {
        std::perror("Failed to open file");
        return 1;
    }
    std::fpos_t current_pos;
    std::fgetpos(file, &current_pos);
    std::fputs("Hello, World!\n", file);
    std::fsetpos(file, &current_pos);
    std::fputs("h", file);
    std::fclose(file);
    file = std::fopen("example.txt", "r");
    if (file == nullptr) {
        std::perror("Failed to open file");
        return 1;
    }
    int ch;
    while ((ch = std::fgetc(file)) != EOF) {
        std::putchar(ch);
    }
    std::fclose(file);
    return 0;
}
```
* std::fgetpos[color ff0000]
* std::fsetpos[link /reference/cstdio/fsetpos.md]
* std::fopen[link /reference/cstdio/fopen.md]
* std::fputs[link /reference/cstdio/fputs.md]
* std::fclose[link /reference/cstdio/fclose.md]
* std::perror[link /reference/cstdio/perror.md.nolink]
* std::fgetc[link /reference/cstdio/fgetc.md]
* std::putchar[link /reference/cstdio/putchar.md]

## 出力
```
hello, World!
```

## 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
