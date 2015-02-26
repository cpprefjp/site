#emplace_back (C++11)
* list[meta header]
* std[meta namespace]

```cpp
template <class... Args>
void emplace_back(Args&&... args);
```

##概要
直接構築で新たな要素を末尾に追加する。  
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

  ls.push_back(std::make_pair(3, std::string("hello")));
  ls.emplace_back(1, std::string("world"));

  for (const auto& x : ls) {
    std::cout << x.first << ',' << x.second << std::endl;
  };
}
```
* emplace_back[color ff0000]

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
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


