# fread
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  std::size_t fread(void *buffer, std::size_t size, std::size_t count, std::FILE *stream);
}
```

## 概要
ファイルから`count`文字の`size`バイトのデータを読み込む。

ファイル内の位置は、読み取られたバイトだけ進む。

## 要件
- `buffer`は有効なポインタであること。
- `size`は0より大きいこと。
- `count`は0より大きいこと。
- `stream`は有効なファイルストリームであること。

## 戻り値
正常に読み込むことのできた項目の数を返す。

`size`または`count`のいずれかが0だった場合、必ず`0`を返し、`buffer`は変更されない。

## 効果
`stream`から`count`個の`size`バイトのデータを読み込む。

読み込んだデータは、`buffer`が指すメモリの先頭から順に格納される。

読み込んだデータの長さは、`count * size`バイトである。

## 例
```cpp example
#include <cstdio>

int main() {
  std::FILE *file = std::fopen("sample.txt", "r");
  if (!file) {
    std::perror("ファイルを開けませんでした");
    return 1;
  }

  char buffer[100];
  /*
  厳密には、sizeof(char)は1バイトであることが保証されているため、
  sizeof(buffer) / sizeof(char)は、bufferの要素数と等しくなる。
  */
  std::size_t count = std::fread(buffer, sizeof(char), sizeof(buffer) / sizeof(char), file);
  std::printf("読み込んだデータの長さ: %zu\n", count);

  std::fclose(file);
  return 0;
}
```
* std::fread[color ff0000]
* std::fopen[link /reference/cstdio/fopen.md]
* std::fclose[link /reference/cstdio/fclose.md]
* std::perror[link /reference/cstdio/perror.md.nolink]
* std::printf[link /reference/cstdio/printf.md]

### ファイル内容(sample.txt)
```
Hello, World!
```

### 出力例
```
読み込んだデータの長さ: 14
```

## 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [sizeof演算子にまつわるアレコレ](https://qiita.com/yohhoy/items/a2ab2900a2bd36c31879)