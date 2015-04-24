#emplace_back (C++11)
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]

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


##備考
- C++14 : 要素型`T`のコピーコンストラクタ、ムーブコンストラクタ、代入演算子、ムーブ代入以外で例外が発生した場合、副作用は発生しない。非CopyInsertableな型`T`のムーブコンストラクタで例外が発生した場合、副作用は未規定。


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
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0
    - 10.0にも`emplace_back`は存在するが、`push_back`相当の機能しかない。


##関連項目
| | |
|-------------------------------------------------------------------------------------------------------|--------------------------------|
| [`push_back`](./push_back.md) | 末尾に要素を追加する |


##参照
- [LWG Issue 2252. Strong guarantee on `vector::push_back()` still broken with C++11?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2252)

