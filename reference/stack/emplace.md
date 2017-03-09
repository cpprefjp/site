#emplace
* stack[meta header]
* std[meta namespace]
* stack[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
template <class... Args>
void emplace(Args&&... args);
```

##概要
要素型`T`のコンストラクタ引数をとり、直接構築でスタックに要素を追加する。


##効果
`c.emplace_back(std::`[`forward`](/reference/utility/forward.md)`<Args>(args)...);`


##戻り値
なし


##例
```cpp
#include <iostream>
#include <stack>
#include <string>
#include <utility>

int main()
{
  std::stack<std::pair<int, std::string>> st;

  st.emplace(3, "aaa");
  st.emplace(1, "bbb");
  st.emplace(4, "ccc");

  while (!st.empty()) {
    std::cout << st.top().first << ", " << st.top().second << std::endl;
    st.pop();
  }
}
```
* emplace[color ff0000]

###出力
```
4, ccc
1, bbb
3, aaa
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++14 mode](/implementation.md#clang): 3.2
- [GCC, C++11 mode](/implementation.md#gcc): 4.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

##参照
- [N2680 Proposed Wording for Placement Insert (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2680.pdf)

