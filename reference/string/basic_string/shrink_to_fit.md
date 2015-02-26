#shrink_to_fit (C++11)
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
void shrink_to_fit();
```

##概要
領域をコンテナのサイズまで切り詰める


##戻り値
なし


##備考
[`capacity`](./capacity.md)`()`を[`size`](./size.md)`()`に縮小させるリクエストを行う。

実装依存の最適化を許可するために、縮小するという動作は仕様上強制されない。


##例
```cpp
#include <iostream>
#include <string>
#include <cassert>

int main()
{
  std::wstring s = L"The quick brown fox jumps over the lazy dog";

  std::cout << s.capacity() << std::endl;

  // 要素削除 : capacityは減らない
  s.erase(s.begin() + 8, s.end());
  std::cout << s.capacity() << std::endl;

  // 領域を切り詰める
  s.shrink_to_fit();
  std::cout << s.capacity() << std::endl;
}
```
* shrink_to_fit[color ff0000]

###出力例
```
47
47
15
```

##実装例
```cpp
void basic_string::shrink_to_fit() {
  swap(basic_string(*this));
}
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.4
- [GCC](/implementation.md#gcc):
- [GCC, C++0x mode](/implementation.md#gcc): 4.5.4, 4.6.4, 4.7.3, 4.8.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0


##参照
- 『[Effective STL - STLを効果的に使いこなす50の鉄則](http://www.amazon.co.jp/dp/4894714108)』 第17項 余分な容量を取り除くには「swap技法」を使おう
- [std::vector<>::shrink_to_fit](../../vector/shrink_to_fit.md)
- [std::deque<>::shrink_to_fit](../../deque/shrink_to_fit.md)
