#count
```cpp
size_type count(const key_type& x) const;
```

##概要
キー `x` を検索し、コンテナ内に見つかった要素の数を返す。


##パラメータ
- `x` : 検索するキー値。`key_type` はメンバ型であり、`multimap` コンテナの中で `Key` の別名として定義される。ここで `Key` は 1 番目のテンプレートパラメータである。


##戻り値
`x` と同じ値のキーの数。
メンバ型 `size_type` は符号なし整数型である。


##計算量
[`size()`](/reference/map/multimap/size.md) について対数時間


##例
```cpp
#include <iostream>
#include <map>

using namespace std;

int main() 
{
  multimap<int, char> c;
  c.insert( std::make_pair(4, 'D'));
  c.insert( std::make_pair(4, 'E'));

  cout << c.count(0) << endl;
  cout << c.count(4) << endl;

  return 0;
}
```

###出力
```
0
2
```
##バージョン
###言語
- C++03

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++11 mode](/implementation#gcc.md): ??
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??, 11.0


##参照

| 名前 | 説明 |
|-------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| [`multimap::find`](/reference/map/multimap/find.md) | 指定したキーで要素を探す |
| [`multimap::size`](/reference/map/multimap/size.md) | 要素数を取得する |
| [`multimap::lower_bound`](/reference/map/multimap/lower_bound.md) | 与えられた値より小さくない最初の要素へのイテレータを返す |
| [`multimap::upper_bound`](/reference/map/multimap/upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す |


