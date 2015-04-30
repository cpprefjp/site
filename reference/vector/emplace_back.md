#emplace_back (C++11)
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
template <class... Args>
void emplace_back(Args&&... args);

template <class... Args>
void vector<bool>::emplace_back(Args&&... args); // C++14
```

##概要
直接構築で新たな要素を末尾に追加する。

この関数の引数`args...`は、要素型Tのコンストラクタ引数である。当関数の内部で要素型`T`のコンストラクタを呼び出し、追加する要素を構築する。


##戻り値
なし


##計算量
定数時間


##備考
- 再確保の可能性、イテレータの有効性への影響、例外発生時に副作用が発生しない保証はいずれも[`push_back()`](./push_back.md)と同様。


##例
```cpp
#include <iostream>
#include <vector>
#include <utility>
#include <string>
#include <algorithm>

int main()
{
  std::vector<std::pair<int, std::string>> v;

  v.emplace_back(3, std::string("hello"));
  v.push_back(std::make_pair(1, std::string("world")));

  std::for_each(v.begin(), v.end(), [](decltype(v)::const_reference x) {
    std::cout << x.first << ',' << x.second << std::endl;
  });
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
- [Visual C++](/implementation.md#visual_cpp): 12.0


##参照
- [LWG Issue 2187. `vector<bool>` is missing emplace and `emplace_back` member functions](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2187)
- [LWG Issue 2252. Strong guarantee on `vector::push_back()` still broken with C++11?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2252)
    - 経緯の説明は、[`vector::push_back()`](/reference/vector/push_back.md)ページを参照。

