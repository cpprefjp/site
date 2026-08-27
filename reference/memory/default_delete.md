# default_delete
* memory[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  // 単一オブジェクト版
  template <class T>
  struct default_delete;

  // 配列版
  template <class T>
  struct default_delete<T[]>;
}
```

## 概要
`default_delete`は、リソースを自動的に解放するスマートポインタクラスである[`unique_ptr`](/reference/memory/unique_ptr.md)において、デフォルトで使用されるデリータクラスである。[`unique_ptr`](/reference/memory/unique_ptr.md)が配列を所有できるようにするため、`T[]`時には`delete[]`を呼びだすように特殊化される。

テンプレートパラメータ`T`には不完全型を指定してよい。ただし、型`T`が不完全型である場合、`operator()`の実行は不適格となる。


## 単一オブジェクト版のメンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](default_delete/op_constructor.md) | コンストラクタ | C++11 |
| [`operator()`](default_delete/op_call.md) | 渡されたポインタを`delete`で削除する | C++11 |


## 配列版のメンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](default_delete/op_constructor.md) | コンストラクタ | C++11 |
| [`operator()`](default_delete/op_call.md) | 渡されたポインタを`delete[]`で削除する | C++11 |

デストラクタは宣言されておらず、暗黙に定義される。


## 例
```cpp example
#include <memory>

// default_deleteはunique_ptrのデフォルト引数として自動的に渡されるため、
// ここでは説明用に明示的にdefault_deleteを指定する

int main()
{
  {
    std::unique_ptr<int, std::default_delete<int>> p(new int());
    *p = 3;
  } // pが指しているintオブジェクトがdeleteされる

  {
    std::unique_ptr<int[], std::default_delete<int[]>> p(new int[3]);

    for (std::size_t i = 0; i < 3; ++i) {
      p[i] = i;
    }
  } // pが指しているint配列がdelete[]される
}
```
* std::default_delete[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.4 [mark verified], 4.7.2 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]


## 関連項目
- [`unique_ptr`](unique_ptr.md)


## 参照
- [LWG Issue 1193. `default_delete` cannot be instantiated with incomplete types](https://cplusplus.github.io/LWG/issue1193)
    - C++11で、テンプレートパラメータ`T`が不完全型であってもよいことが明記された。不完全型を扱う[`unique_ptr`](unique_ptr.md)を宣言できるようにするため
- [N4089 Safe conversions in `unique_ptr<T[]>`, revision 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4089.pdf)
    - C++17で、配列版に変換コンストラクタが追加され、関数呼び出し演算子が制約付きのテンプレートへ置き換えられた
- [P2273R3 Making `std::unique_ptr` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2273r3.pdf)
