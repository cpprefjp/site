# 定数式の文脈でのboolへの縮小変換を許可
* cpp23[meta cpp]

## 概要
C++23では、以下の定数式文脈での`bool`への縮小変換を許可する：

- `static_assert`
- `if constexpr`

これにより、整数値から`bool`への変換 (ビットフラグの判定などで使われる)、スコープをもたない列挙値型から`bool`への変換ができる定数式の条件式内でできるようになる。

ただし`explicit(bool)`および`noexcept(bool)`のパラメータについては縮小変換が許可されないため、整数値として値`1`か`0`のどちらかしか指定できず、`noexcept(sizeof(char[2]))`のようなコードはコンパイルエラーとなる。


### `static_assert`の例

```cpp
// 整数値が0でなければtrue、そうでなければfalse
static_assert(bool(N)); // これまでの書き方
static_assert(N);       // C++23以降

static_assert(sizeof(int[2])); // C++23:OK 縮小変換
```

### `if constexpr`の例
```cpp
if constexpr(bool(flags & Flags::Exec)) { … }  // これまでの書き方
if constexpr((flags & Flags::Exec) != 0) { … } // これまでの書き方
if constexpr(flags & Flags::Exec) { … }        // C++23以降

if constexpr (sizeof(int[2])) { … } // C++23:OK 縮小変換
```

## 関連項目
- [C++11 コンパイル時アサート](/lang/cpp11/static_assert.md)
- [C++17 `constexpr if`文](/lang/cpp17/if_constexpr.md)


## 参照
- [P1401R5 Narrowing contextual conversions to `bool`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1401r5.html)
