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

マクロを使用したい場合、対応するヘッダーファイルをインクルードまたはインポートする必要がある。

```cpp example
import std;
import <cassert>;

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

グローバル名前空間にも定義を導入したい場合、[`std.compat`](std.compat.md)を使用できる。

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
