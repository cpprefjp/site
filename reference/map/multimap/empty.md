#empty
```cpp
bool empty() const noexcept;
```

##概要
コンテナが空かどうかをテストする。 
`multimap` コンテナが空（[`size()`](/reference/map/multimap/size.md) が 0）の場合に `true` を返す。 

この関数はコンテナ内のコンテンツを変化させない。コンテンツをクリアするには [`clear()`](/reference/map/multimap/clear.md) メンバを使う。


##戻り値
コンテナサイズが 0 のときに `true`, そうでないときに `false`。


##計算量
定数時間。


##例
```cpp
#include <iostream>
#include <map>
using namespace std;

int main ()
{
  multimap<int, char> c;

  cout << c.empty() << endl;

  c.insert(std::make_pair(42,'a'));

  cout << c.empty() << endl;

  return 0;
}
```

###出力
```
1
0
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0

##参照

| 名前 | 説明|
|---------------------------------------------------------------------------------------|-----------------------|
| [`multimap::insert`](/reference/map/multimap/insert.md) | 要素を挿入する |
| [`multimap::(constructor)`](/reference/map/multimap/multimap.md) | コンストラクタ |


