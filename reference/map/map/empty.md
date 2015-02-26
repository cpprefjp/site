#empty
* map[meta header]

```cpp
bool empty() const noexcept;
```

##概要
コンテナが空かどうかをテストする。 
`map` コンテナが空（[`size()`](/reference/map/map/size.md) が 0）の場合に `true` を返す。 

この関数はコンテナ内のコンテンツを変化させない。コンテンツをクリアするには [`clear()`](/reference/map/map/clear.md) メンバを使う。


##戻り値
コンテナサイズが 0 のときに `true`, そうでないときに `false`。


##計算量
定数時間。


##例
```cpp
#include <iostream>
#include <map>

int main ()
{
  std::map<int, char> c;

  std::cout << c.empty() << std::endl;

  c.insert(std::make_pair(42,'a'));

  std::cout << c.empty() << std::endl;

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
| [`map::insert`](/reference/map/map/insert.md) | 要素を挿入する |
| [`map::(constructor)`](/reference/map/map/op_constructor.md) | コンストラクタ |


