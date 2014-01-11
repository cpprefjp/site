#shrink_to_fit(C++11)
```cpp
void shrink_to_fit();
```

##概要
領域をコンテナのサイズまで切り詰める


##戻り値
なし


##備考
[`capacity`](./capacity.md)`()`を[`size`](./size.md)`()`に縮小させるというリクエストを行う。

実装依存の最適化を許可するために、縮小するという動作は仕様上強制されない。


##例
```cpp
#include <iostream>
#include <vector>
#include <cassert>

int main()
{
  std::vector<int> v = {1, 2, 3};

  std::cout << v.capacity() << std::endl;

  // 要素削除 : capacityは減らない
  v.erase(v.begin());
  std::cout << v.capacity() << std::endl;

  // 領域を切り詰める
  v.shrink_to_fit();
  std::cout << v.capacity() << std::endl;
  assert(v.capacity() == v.size());
}
```
* shrink_to_fit[color ff0000]

###出力
```
3
3
2
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): 10.0, 11.0, 12.0


##参照
- 『[Effective STL - STLを効果的に使いこなす50の鉄則](http://www.amazon.co.jp/dp/4894714108)』 第17項 余分な容量を取り除くには「swap技法」を使おう


