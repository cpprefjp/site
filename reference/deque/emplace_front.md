#emplace_front (C++11)
```cpp
template <class... Args>
void emplace_front(Args&&... args);
```

##概要
先頭に要素を直接構築で追加する

この関数の引数`args...`は、要素型Tのコンストラクタ引数である。当関数の内部で要素型`T`のコンストラクタを呼び出し、追加する要素を構築する。


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

  c.emplace_front(3, std::string("world"));
  c.push_front(std::make_pair(1, std::string("hello")));

  for (const auto& x : c) {
    std::cout << x.first << ',' << x.second << std::endl;
  }
}
```
* emplace_front[color ff0000]

###出力
```
1,hello
3,world
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0
    - 10.0にも`emplace_front`は存在するが、`push_front`相当の機能しかない。


##参照


