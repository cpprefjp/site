# コンストラクタ
* atomic[meta header]
* std[meta namespace]
* atomic_ref[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
explicit atomic_ref(T& obj);                            // (1) C++20
constexpr explicit atomic_ref(T& obj);                  // (1) C++26

atomic_ref(const atomic_ref& other) noexcept;           // (2) C++20
constexpr atomic_ref(const atomic_ref& other) noexcept; // (2) C++26

explicit atomic_ref(T&&) = delete;                      // (3) C++26

template <class U>
constexpr atomic_ref(const atomic_ref<U>& other) noexcept; // (4) C++26
```

## 概要
- (1) : `obj`を参照して`*this`にポインタとして保持する
- (2) : コピーコンストラクタ。`other`が参照するオブジェクトを`*this`もまた参照する
- (3) : 一時オブジェクト（右辺値）を参照する`atomic_ref`が構築されるのを防ぐため、`delete`定義されている
- (4) : 変換コンストラクタ。CV修飾のみが異なる`atomic_ref<U>`から構築し、`other`が参照するオブジェクトを`*this`もまた参照する


## テンプレートパラメータ制約
- (4) : `T`と`U`が類似の型 (similar type) であり、[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<U*, T*>`が`true`であること
    - 類似の型とは、CV修飾を除いて同じ型であることをいう。つまり`atomic_ref<int>`から`atomic_ref<const int>`のように、CV修飾を加える方向にのみ変換できる


## 事前条件
- 参照するオブジェクトがメンバ定数のアライメント値`required_alignment`にアライメントされていること


## 例外
投げない


## 事後条件
- (4) : `*this`は、`other`が参照しているオブジェクトを参照する


## 備考
- デフォルトコンストラクタは定義されない


## 例
### 基本的な使い方
```cpp example
#include <atomic>

int main()
{
  int value = 3;

  // valueを参照するatomic_refオブジェクトを構築
  std::atomic_ref<int> a{value};

  // コンストラクタの引数によって、
  // クラステンプレートのテンプレート引数を推論 (<int>を省略)
  std::atomic_ref b{value};

  // cとbで同じ値 (value) を参照
  std::atomic_ref c = b;
}
```

#### 出力
```
```

### CV修飾の異なる`atomic_ref`へ変換する (C++26)
```cpp example
#include <atomic>
#include <iostream>

int main()
{
  int value = 3;
  std::atomic_ref<int> a{value};

  // 読み取り専用のatomic_ref<const int>へ変換する
  std::atomic_ref<const int> b = a;

  std::cout << b.load() << std::endl;
}
```

#### 出力
```
3
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG issue 3160. `atomic_ref() = delete;` should be deleted](https://wg21.cmeerw.net/lwg/issue3160)
- [P3309R3 `constexpr atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3309r3.html)
    - C++26で`constexpr`に対応した
- [LWG Issue 4472. `atomic_ref<const T>` can be constructed from temporaries](https://cplusplus.github.io/LWG/issue4472)
    - C++26で、一時オブジェクト（右辺値）からの構築を禁止する`delete`定義されたコンストラクタ (3) が追加された
- [P3860R1 Proposed Resolution for NB Comment GB13-309 `atomic_ref<T>` is not convertible to `atomic_ref<const T>`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3860r1.html)
    - C++26で、CV修飾のみが異なる`atomic_ref`から構築する変換コンストラクタ (4) が追加された。C++26でCV修飾された型に対応した際 (P3323R1) に、この変換が考慮されていなかったことへの対応
