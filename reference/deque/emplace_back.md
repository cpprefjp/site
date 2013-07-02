#emplace_back(C++11)
```cpp
template <class... Args>
void emplace_back(Args&&... args);
```

##概要
直接構築で新たな要素を末尾に追加する。
この関数の引数`args...`は、要素型Tのコンストラクタ引数である。当関数の内部で要素型`T`のコンストラクタを呼び出し、追加する要素を構築する。

この関数の呼び出し後は全てのイテレータは無効化されるが、参照は無効化されない。


##戻り値
なし


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <deque>
#include <utility>
#include <string>

int main()
{
  std::deque<std::pair<int, std::string>> c;

  c.emplace_back(3, std::string("hello"));
  c.push_back(std::make_pair(1, std::string("world")));

  for (const auto& x : c) {
    std::cout << x.first << ',' << x.second << std::endl;
  }
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
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照
| | |
|-------------------------------------------------------------------------------------------------------|--------------------------------|
| [`push_back`](./push_back.md) | 末尾に要素を追加する |


