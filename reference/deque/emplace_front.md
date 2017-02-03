#emplace_front
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
template <class... Args>
void emplace_front(Args&&... args);
```

##概要
先頭に要素を直接構築で追加する。

この関数の引数`args...`は、要素型Tのコンストラクタ引数である。当関数の内部で要素型`T`のコンストラクタを呼び出し、追加する要素を構築する。


##戻り値
なし


##計算量
定数時間


##備考
操作中に例外が発生した場合、副作用は発生しない。


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
* c.push_front[link push_front.md]
* std::make_pair[link /reference/utility/make_pair.md]

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
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0
    - 10.0にも`emplace_front`は存在するが、`push_front`相当の機能しかない。


##参照
- [N2680 Proposed Wording for Placement Insert (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2680.pdf)
- [LWG Issue 2252. Strong guarantee on `vector::push_back()` still broken with C++11?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2252)
    - 経緯の説明は、[`vector::push_back()`](/reference/vector/push_back.md)ページを参照。

