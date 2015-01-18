#lower_bound
```cpp
iterator lower_bound(const key_type& x);
const_iterator lower_bound(const key_type& x) const;
```

##概要
`x` を右辺とする `<` 演算が成り立たない最初の要素を指すイテレータを返す（コンテナの比較オブジェクトが使われる）。すなわちこれは `>=` 演算にあたる。 
[`upper_bound()`](/reference/map/multimap/upper_bound.md) とは異なり、このメンバ関数は `x` より大きいだけでなく、`x` と等しい場合であってもその要素へのイテレータを返す。 
内部的には `multimap` コンテナ内の全ての要素は常に比較オブジェクトが定義する基準に沿って並んでいるため、この関数が返すいずれかの後に続く全ての要素が `x` より大きいか等しいことに注意。


##パラメータ
- `x` : 比較されるキー値。`key_type` はメンバ型であり、`multimap` コンテナの中で `Key` の別名として定義される。ここで `Key` は 1 番目のテンプレートパラメータである。


##戻り値
コンテナ内で `x` を右辺とする `<` 演算が成り立たない最初の要素へのイテレータ。`iterator` はメンバ型であり `multimap` コンテナにおいては双方向イテレータとして定義される。


##計算量
[`size()`](/reference/map/multimap/size.md) について対数時間。


##例
```cpp
#include <iostream>
#include <map>

int main()
{
  std::multimap<int,char> c;

  c.insert(std::make_pair(10,'a'));
  c.insert(std::make_pair(20,'b'));
  c.insert(std::make_pair(30,'c'));

  auto ii = c.lower_bound(20);
  std::cout << ii->first << "," << ii->second << std::endl;

  return 0;
}
```

###出力
```
20,b
```

##バージョン
###言語
- C++03

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0

##参照

| 名前 | 説明 |
|-------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| [`upper_bound`](/reference/map/multimap/upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す |
| [`equal_range`](/reference/map/multimap/equal_range.md) | 指定したキーにマッチする要素範囲を返す |
| [`find`](/reference/map/multimap/find.md) | 指定したキーで要素を探す |
| [`count`](/reference/map/multimap/count.md) | 指定したキーにマッチする要素の数を返す |
