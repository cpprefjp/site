# fwrite
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  size_t fwrite(const void *buffer, size_t size, size_t count, FILE *stream);
}
```

## 概要
ストリームに`count`個の`size`バイトの要素を書き込む。

ストリーム内の位置は、書き込まれたバイトだけ進む。

書き込み時にエラーが発生した場合、ストリーム内の位置は不定である。

また、書き込みには内部的に[`fputc`](/reference/cstdio/fputc.md)を使用する。

## 要件
- `buffer`は有効なポインタであること。
- `stream`は有効なファイルストリームであること。

## 戻り値
正常に書き込むことのできた要素の数を返す。

## 効果
`buffer`が指すメモリから`count`個の`size`バイトの要素を`stream`に書き込む。

書き込みエラーが生じなければ、書き込むデータの大きさは`count * size`バイトである。

## 例
```cpp example
#include <cstdio>

int main() {
  std::FILE *file = std::fopen("output.txt", "w");
  if (!file) {
    std::perror("ファイルを開けませんでした");
    return 1;
  }

  const char data[] = "Hello, World!";
  /*
  厳密には、sizeof(char)は1バイトであることが保証されているため、
  sizeof(data) - 1は、文字列の長さ（ヌル終端文字を除く）と等しくなる。
  */
  std::size_t count = std::fwrite(data, sizeof(char), sizeof(data) - 1, file);
  std::printf("書き込んだデータの長さ: %zu\n", count);

  std::fclose(file);
  return 0;
}
```
* std::fwrite[color ff0000]
* std::fopen[link /reference/cstdio/fopen.md]
* std::fclose[link /reference/cstdio/fclose.md]
* std::perror[link /reference/cstdio/perror.md.nolink]
* std::printf[link /reference/cstdio/printf.md]

### 出力例
```
書き込んだデータの長さ: 13
```

### ファイル出力(output.txt)
```
Hello, World!
```

## 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
