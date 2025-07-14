# fpos_t
* cstdio[meta header]
* type-alias[meta id-type]
* std[meta namespace]

```cpp
namespace std {
  using fpos_t = object-type;
}
```

## 概要
ファイルの位置を保持するための型。

[`fgetpos()`](/reference/cstdio/fgetpos.md.nolink)関数や[`fsetpos()`](/reference/cstdio/fsetpos.md.nolink)関数で用いられる。これらの関数は[`fseek()`](/reference/cstdio/fseek.md.nolink)関数や[`ftell()`](/reference/cstdio/ftell.md.nolink)関数と違い、巨大なファイルやマルチバイトファイルに対しても適切に動作するすることを目的に設計された。

## 例
```cpp example
#include <cstdio>

int main() {
  std::FILE *file = std::fopen("sample.txt", "r");
  if (!file) {
    std::perror("ファイルを開けませんでした");
    return 1;
  }

  std::fpos_t pos;
  std::fgetpos(file, &pos); // ファイルの位置をposに保存する

  int c = std::fgetc(file);
  std::printf("1文字目: %c\n", c);

  std::fsetpos(file, &pos); // ファイルの読み取り位置をposにする

  c = std::fgetc(file);
  std::printf("もう一度1文字目: %c\n", c);

  std::fclose(file);
  return 0;
}

```
* std::fpos_t[color ff0000]
* std::fgetpos[link /reference/cstdio/fgetpos.md.nolink]
* std::fsetpos[link /reference/cstdio/fsetpos.md.nolink]
* std::fopen[link /reference/cstdio/fopen.md]
* std::fclose[link /reference/cstdio/fclose.md]
* std::fgetc[link /reference/cstdio/fgetc.md]
* std::printf[link /reference/cstdio/printf.md]
* std::perror[link /reference/cstdio/perror.md.nolink]

### ファイル内容(sample.txt)
```
Hello, World!
```

### 出力
```
1文字目: H
もう一度1文字目: H
```

## 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??