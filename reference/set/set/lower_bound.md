#lower_bound
* set[meta header]
* std[meta namespace]
* set[meta class]
* function[meta id-type]

```cpp
iterator lower_bound(const key_type& x);
const_iterator lower_bound(const key_type& x) const;
```

##概要
`x` を右辺とする `<` 演算が成り立たない最初の要素を指すイテレータを返す（コンテナの比較オブジェクトが使われる）。すなわちこれは `>=` 演算にあたる。 
[`upper_bound()`](./upper_bound.md) とは異なり、このメンバ関数は `x` より大きいだけでなく、`x` と等しい場合であってもその要素へのイテレータを返す。 
内部的には `set` コンテナ内の全ての要素は常に比較オブジェクトが定義する基準に沿って並んでいるため、この関数が返すいずれかの後に続く全ての要素が `x` より大きいか等しいことに注意。


##パラメータ
- `x` : 比較されるキー値。`key_type` はメンバ型であり、`set` コンテナの中で `Key` の別名として定義される。ここで `Key` は 1 番目のテンプレートパラメータであり、コンテナに格納される要素の型である。


##戻り値
コンテナ内で `x` を右辺とする `<` 演算が成り立たない最初の要素へのイテレータ。`iterator` はメンバ型であり `set` コンテナにおいては双方向イテレータとして定義される。


##計算量
[`size()`](./size.md) について対数時間。


##例
```cpp
#include <iostream>
#include <set>

int main()
{
  std::set<int> c;

  c.insert(10);
  c.insert(20);
  c.insert(30);

  std::cout << *c.lower_bound(20) << std::endl;
}
```
* iostream[link ../../iostream.md]
* set[link ../../set.md]
* insert[link insert.md]
* cout[link ../../iostream/cout.md]
* lower_bound[color ff0000]
* endl[link ../../ostream/endl.md]

###出力
```
20
```

##参照

| 名前                              | 説明                                               |
|-----------------------------------|----------------------------------------------------|
| [`upper_bound`](./upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す |
| [`equal_range`](./equal_range.md) | 指定したキーにマッチする要素範囲を返す             |
| [`find`](./find.md)               | 指定したキーで要素を探す                           |
| [`count`](./count.md)             | 指定したキーにマッチする要素の数を返す             |
