# inout_ptr_t
* memory[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  template<class Smart, class Pointer, class... Args>
  class inout_ptr_t;
}
```

## 概要
2重ポインタ`T**`(=`Pointer*`)引数経由で既存リソースを解放してから新規確保リソースへのポインタを返すレガシーC関数に対して、取得されたポインタ値をスマートポインタに格納するアダプタクラス。
アダプタオブジェクトの生成には、[`std::inout_ptr()`](inout_ptr.md)ヘルパ関数を利用する。

リソース占有管理セマンティクスを提供するC++標準スマートポインタ[`std::unique_ptr`](unique_ptr.md)を始め、互換インタフェースをもつ任意のスマートポインタ型`Smart`を取り扱える。

プログラマは`inout_ptr_t`クラステンプレートの特殊化を定義してもよい。
このとき1つ以上のプログラム定義型に依存していれば、プライマリテンプレートにおける要件を満たす必要はない。


## テンプレートパラメータ制約
`Pointer`はCpp17NullablePointer要件を満たすこと


## 適格要件
`Smart`が[`shared_ptr`](shared_ptr.md)の特殊化の場合、プログラムは不適格となる。


## メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`(constructor)`](inout_ptr_t/op_constructor.md) | コンストラクタ | C++23 |
| [`(destructor)`](inout_ptr_t/op_destructor.md)   | デストラクタ   | C++23 |
| [`operator Pointer*()`](inout_ptr_t/op_pointer.md) | `Pointer*`への暗黙変換 | C++23 |
| [`operator void**()`](inout_ptr_t/op_voidpp.md) | `void**`への暗黙変換 | C++23 |


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`inout_ptr()`](inout_ptr.md)
- [`unique_ptr`](unique_ptr.md)


## 参照
- [P1132R8 out_ptr - a scalable output pointer abstraction](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1132r8.html)
