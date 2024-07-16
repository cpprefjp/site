# std
* std[meta module]
* cpp23[meta cpp]

`std` は、すべての[C++標準ライブラリ](/reference.md)(C++ライブラリおよびC言語互換ライブラリ)の内容を含む[モジュール](/lang/cpp20/modules.md)。

```cpp example
import std;

int main() {
  std::println("Hello, world!");
}
```

ただし、モジュールではマクロをエクスポートできないため、標準ライブラリで定義されるマクロは含まない。

```cpp example
import std;

int main() {
  assert(0 < 1); // エラー: assertはマクロなので含まない
}
```

マクロを使用したい場合、対応するヘッダーファイルをインクルード(または、[ヘッダーユニット](/lang/cpp20/modules.md)としてインポート)する必要がある。

```cpp example
import std;
#include <cassert>

int main() {
  assert(0 < 1); // OK
}
```

このモジュールは、C言語互換ライブラリの内容をグローバル名前空間には導入しない。

```cpp example
import std;

int main() {
  std::printf("Hello, world!"); // OK
  printf("Hello, world!");      // エラー: グローバル名前空間では定義されない

  std::size_t x = 0;            // OK
  size_t y = 0;                 // エラー: グローバル名前空間では定義されない
}
```

グローバル名前空間にも定義を導入したい場合、`std`の代わりに[`std.compat`](std.compat.md)を使用できる(両方を使う必要はない)。

## この機能が必要になった背景・経緯

C++20に言語機能としての[モジュール](/lang/cpp20/modules.md)を追加する議論と並行して、標準ライブラリをモジュールへ再編する議論も行われていた。
例えば、[P0581R1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0581r1.pdf)では以下のモジュールが提案されている。

- `std.fundamental`
- `std.core`
- `std.io`
- `std.os`
- `std.concurrency`
- `std.math`
- `std`

しかし、標準ライブラリ全体の再編はあまりにも壮大であり、C++20には間に合わなかった。
これではモジュールの恩恵を受けるのが難しいということで、最小限のモジュールとして`std`がC++23に間に合うように追加された。

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): ?
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

## 関連項目
- [モジュール](/lang/cpp20/modules.md)

## 参照
- [P2465R3 Standard Library Modules std and std.compat](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2465r3.pdf)
