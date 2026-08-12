# デストラクタ
* memory[meta header]
* std[meta namespace]
* polymorphic[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr ~polymorphic();
```

## 概要
`polymorphic`オブジェクトを破棄する。


## 適格要件
`T`は完全型であること。


## 効果
`*this`が無効値状態でなければ、所有するオブジェクトを[`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::destroy`で破棄し、ストレージを解放する。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::polymorphic`](../polymorphic.md)


## 参照
- [P3019R14 `indirect` and `polymorphic`: Vocabulary Types for Composite Class Design](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3019r14.pdf)
- [LWG Issue 4532. Imprecise `std::polymorphic` wording seems to imply slicing](https://cplusplus.github.io/LWG/issue4532)
    - C++26で、コピー/ムーブや破棄の際に、所有オブジェクトの動的型`U`を保持する（基底型へスライスしない）ことがワーディング上明確化された
