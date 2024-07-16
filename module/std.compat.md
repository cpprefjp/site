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

## 備考
`std.compat`は[`std`](std.md)の内容をすべて含んでいるので、`std.compat`をインポートする場合は[`std`](std.md)をインポートしなくてよい。

## この機能が必要になった背景・経緯

標準ライブラリモジュール[`std`](std.md)で、C言語互換ライブラリの内容をグローバル名前空間に導入するかどうかで意見が分かれた結果、別のモジュールとして用意することになった。

- C言語互換ライブラリの内容をグローバル名前空間に導入しない場合、既存コードベースを移行するのが難しくなる(例えば、`std::size_t`ではなく`size_t`と書いているコードは多いだろう)。
- 一方、「`<foobar.h>`は確実にグローバル名前空間へ名前を導入する一方、`std`名前空間に導入するかどうかは未規定。`<cfoobar>`はその逆」という混乱した状況を、グローバル名前空間へ名前を導入しない方向へ解決する滅多にない機会でもあった。

そこで、2つのモジュールを用意することで両方の課題を解決することとなった。グローバル名前空間を綺麗にしたいユーザーは[`std`](std.md)のみを使用すればよい。
一方、既存コードの互換性を重視したいときは、`std.compat`をインポートすればよい。
ただし、この場合でも標準ライブラリのマクロに依存したコードの互換性はない点には注意が必要である。

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
