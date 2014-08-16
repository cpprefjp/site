#count
```cpp
size_type count(const key_type& x) const;
```

##概要
キー `x` を検索し、コンテナ内に見つかった要素の数を返す。`map` コンテナはキーの重複を許さないため、この関数は実際には要素が見つかったときに 1 を、そうでないときに 0 を返す。


##パラメータ
- `x` : 検索するキー値。`key_type` はメンバ型であり、`map` コンテナの中で `Key` の別名として定義される。ここで `Key` は 1 番目のテンプレートパラメータである。


##戻り値
`x` と同じ値のキーが見つかったなら 1、そうでないなら 0。
メンバ型 `size_type` は符号なし整数型である。


##計算量
[`size()`](/reference/map/map/size.md) について対数時間


##例
```cpp
#include <iostream>
#include <map>

using namespace std;

int main() 
{
  map<int, char> c;
  c[4] = 'D';

  cout << c.count(0) << endl;
  cout << c.count(4) << endl;

  return 0;
}
```

###出力
```
0
1
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
|-------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| [`map::find`](/reference/map/map/find.md) | 指定したキーで要素を探す |
| [`map::size`](/reference/map/map/size.md) | 要素数を取得する |
| [`map::lower_bound`](/reference/map/map/lower_bound.md) | 与えられた値より小さくない最初の要素へのイテレータを返す |
| [`map::upper_bound`](/reference/map/map/upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す |


