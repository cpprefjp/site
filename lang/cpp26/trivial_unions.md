# 共用体の特殊メンバ関数のトリビアル化 [P3074R7]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++26では、共用体 (`union`) のデフォルトコンストラクタとデストラクタの規則を変更し、より多くの場合にトリビアル (trivial) となるようにする。

これにより、非トリビアルな型のメンバをもつ共用体を未初期化のストレージとして`constexpr`の文脈で使用できるようになる。

```cpp
template <typename T, std::size_t N>
struct FixedVector {
  union { T storage[N]; };
  std::size_t size = 0;

  // C++23まで: unionのコンストラクタ/デストラクタが削除されるためコンパイルエラー
  // C++26: OK。unionのコンストラクタ/デストラクタはトリビアル
  constexpr FixedVector() = default;

  constexpr ~FixedVector() {
    std::destroy(storage, storage + size);
  }

  constexpr auto push_back(T const& v) -> void {
    std::construct_at(storage + size, v);
    ++size;
  }
};
```
* std::construct_at[link /reference/memory/construct_at.md]
* std::destroy[link /reference/memory/destroy.md]


## 仕様
### デフォルトコンストラクタの規則

共用体のデフォルトコンストラクタは、以下の条件を満たす場合にトリビアルとなる：

- デフォルトメンバ初期化子をもつメンバがない

トリビアルなデフォルトコンストラクタは、いかなる初期化も実行しない。ただし、共用体の最初の選択肢 (variant member) が暗黙的寿命型 (implicit-lifetime type) の場合は、そのオブジェクトの寿命が開始され、アクティブメンバとなる。

```cpp
// トリビアルデフォルトコンストラクタ、トリビアルデストラクタ
// sの寿命は開始されない
union U1 { std::string s; };

// 非トリビアルデフォルトコンストラクタ (デフォルトメンバ初期化子がある)
// デストラクタは削除される
union U2 { std::string s = "hello"; };

// トリビアルデフォルトコンストラクタ、トリビアルデストラクタ
// s (配列は暗黙的寿命型) の寿命が開始され、アクティブメンバとなる
union U3 { std::string s[10]; };
```

### デストラクタの規則

共用体のデストラクタは、デフォルトメンバ初期化子をもつメンバが非トリビアルなデストラクタをもつ場合に削除される。それ以外の場合、デストラクタはトリビアルとなる。

```cpp
// トリビアルデストラクタ (デフォルトメンバ初期化子なし)
union U4 { std::string s; };

// 削除されたデストラクタ (デフォルトメンバ初期化子があり、std::stringは非トリビアルデストラクタ)
union U5 { std::string s = "hello"; };

// トリビアルデストラクタ (デフォルトメンバ初期化子はあるが、intはトリビアルデストラクタ)
union U6 { std::string s; int n = 0; };
```

### constexprでの使用
この変更により、共用体を未初期化ストレージとして`constexpr`の文脈で使用できるようになる。

```cpp example
#include <cassert>
#include <new>

constexpr int f() {
  union { int s[4]; };
  // sは暗黙的寿命型の配列なので、寿命が開始されアクティブメンバとなる
  std::construct_at(&s[0], 1);
  std::construct_at(&s[1], 2);
  std::construct_at(&s[2], 3);
  return s[0] + s[1] + s[2];
}

int main() {
  static_assert(f() == 6);
}
```
* std::construct_at[link /reference/memory/construct_at.md]

### 既存コードへの影響
- これまで削除されていたコンストラクタ/デストラクタがトリビアルになるケースがあるため、以前はコンパイルエラーだったコードがコンパイル可能になる
- すでに有効なコードの意味は変わらない
- 未初期化オブジェクトへのアクセスは依然として未定義動作


## 備考
### `inplace_vector`への影響
この変更により、[`std::inplace_vector`](/reference/inplace_vector.md)コンテナが非トリビアルな要素型をもつ場合でも`constexpr`で使用できるようになる。

### 非トリビアルデストラクタの実行時コスト
「なにもしないデストラクタ」であっても非トリビアルである場合、コンパイラはデストラクタの呼び出しコードを生成する必要があり、最適化が妨げられる場合がある。デストラクタがトリビアルであればそのようなコードは不要であり、`new[]`式でのcookie (配列要素数の管理情報) も不要になる。


## この機能が必要になった背景・経緯
`constexpr`プログラミングにおいて、未初期化のストレージを扱う需要がある。実行時プログラミングでは`alignas(T) unsigned char buffer[sizeof(T)]`のようなバイト配列を使用できるが、この手法は`constexpr`では動作しない。

代わりに共用体を使用するのが自然なアプローチであるが、非トリビアルな型をメンバにもつ共用体はデフォルトコンストラクタとデストラクタが暗黙的に削除されてしまうため、「なにももしない」コンストラクタとデストラクタを明示的に定義する必要があった。しかし、明示的に定義された「なにももしない」デストラクタはトリビアルではなく、実行時のパフォーマンスコストが発生していた。

この仕様変更により、共用体のコンストラクタとデストラクタの規則を改善し、未初期化ストレージとしての使用を`constexpr`と実行時の両方でゼロコストにする。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 `constexpr`](/lang/cpp11/constexpr.md)
- [C++26 `constexpr`配置`new`](/lang/cpp26/constexpr_placement_new.md)
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)
- [`std::inplace_vector`](/reference/inplace_vector/inplace_vector.md)


## 参照
- [P3074R7 trivial unions (was std::uninitialized)](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3074r7.html)
