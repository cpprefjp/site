# std.compat
* std.compat[meta module]
* cpp23[meta cpp]

`std.compat` は、[`std`](std.md)に加えて、C言語互換ライブラリの内容をグローバル名前空間にも導入する[モジュール](/lang/cpp20/modules.md)。

[`std`](std.md)と同様に、マクロは含まない。

```cpp example
import std.compat;

int main() {
  std::printf("Hello, world!"); // OK
  printf("Hello, world!");      // OK

  std::size_t x = 0;            // OK
  size_t y = 0;                 // OK
}
```

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
