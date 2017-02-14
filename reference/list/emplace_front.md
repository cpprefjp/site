#emplace_front
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
template <class... Args>
void emplace_front(Args&&... args);
```

##概要
直接構築で新たな要素を先頭に追加する。  
この関数の引数`args...`は、要素型`T`のコンストラクタ引数である。当関数の内部で要素型`T`のコンストラクタを呼び出し、追加する要素を構築する。


##戻り値
なし


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <list>
#include <utility>
#include <string>

int main()
{
  std::list<std::pair<int, std::string>> ls;

  ls.emplace_front(1, std::string("world"));
  ls.push_front(std::make_pair(3, std::string("hello")));

  for (const auto& x : ls) {
    std::cout << x.first << ',' << x.second << std::endl;
  };
}
```
* emplace_front[color ff0000]
* ls.push_front[link push_front.md]
* std::make_pair[link /reference/utility/make_pair.md]

###出力
```
3,hello
1,world
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照
- [N2680 Proposed Wording for Placement Insert (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2680.pdf)


