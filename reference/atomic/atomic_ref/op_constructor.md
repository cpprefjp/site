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
```

## 概要
- (1) : `obj`を参照して`*this`にポインタとして保持する
- (2) : コピーコンストラクタ。`other`が参照するオブジェクトを`*this`もまた参照する


## 事前条件
- 参照するオブジェクトがメンバ定数のアライメント値`required_alignment`にアライメントされていること


## 例外
投げない


## 備考
- デフォルトコンストラクタは定義されない


## 例
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


### 出力
```
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
