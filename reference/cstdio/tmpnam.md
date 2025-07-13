# tmpnam
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  char* tmpnam( char* filename );
}
```

## 概要
一時ファイル名を生成する。

渡した引数の中にファイル名が格納される。

この関数はスレッドセーフではないため、マルチスレッド環境での使用は推奨されない。

また、生成された名前が他のファイル名とかぶらないことは保証されていない（保証する必要があるならば[`tmpfile`](/reference/cstdio/tmpfile.md)を使用する）。

## 戻り値
成功した場合
- 渡した引数のポインタを返す。
- 渡した引数が`NULL`であった場合、内部にある静的なバッファへのポインタが返される。

失敗した場合、`NULL`を返す。

## 例
```cpp example
#include <cstdio>
#include <iostream>

int main() {
    char filename[L_tmpnam];
    if (std::tmpnam(filename)) {
        std::cout << "Generated filename: " << filename << '\n';
        // ここで fopen(filename, "w") とかして使う（が、あまり推奨されない）
    } else {
        std::cerr << "Failed to generate temp name\n";
    }
}
```

## 処理系

- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
