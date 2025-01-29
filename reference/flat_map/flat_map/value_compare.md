# value_compare
* flat_map[meta header]
* std[meta namespace]
* flat_map[meta class]
* class[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  class flat_map::value_compare;
}
```

## 概要
`value_compare` は `flat_map` の入れ子クラスで、`flat_map::value_type` 型のオブジェクトを比較する関数オブジェクト型である。  
比較の基準は `flat_map::key_compare` と同様であるが、`flat_map::key_compare` の関数呼び出し演算子の引数型が `flat_map::key_type` であるのに対して、本クラスの関数呼び出し演算子の比較型は `flat_map::value_type` である点が異なっている。
なお、引数のうち [`flat_map`](../flat_map.md)`::mapped_type` にあたる [`pair`](../../utility/pair.md) の `second` 部については、比較時には無視される。


## メンバ関数
| 名前                                                      | 説明               | 対応バージョン |
|-----------------------------------------------------------|--------------------|----------------|
| [`operator()`](value_compare/op_call.md.nolink)           | 関数呼び出し演算子 |                |

一般的な実装では、`key_compare` 型をメンバ変数で保持しており、その変数名を `comp` とすると、以下の動作となる。
    ```cpp
    bool operator()(const_reference x, const_reference y) const {
      return comp(x.first, y.first);
    }
    ```


## 例
[`value_comp()`](value_comp.md) の例を参照。


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前                                | 説明                                                     |
|-------------------------------------|----------------------------------------------------------|
| [`key_comp`](key_comp.md)           | キー比較用の関数オブジェクトを取得する                      |
| [`value_comp`](value_comp.md)       | 要素比較用の関数オブジェクトを返す                       |
