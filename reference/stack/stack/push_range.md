# push_range
* stack[meta header]
* std[meta namespace]
* stack[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
template <container-compatible-range<value_type> R>
void push_range(R&& rg);           // (1) C++23
template <container-compatible-range<value_type> R>
constexpr void push_range(R&& rg); // (1) C++26
```

## 概要
Range`rg` の各要素を `stack` の末尾に追加する。


## 効果
`c.append_range(forward<R>(rg))` が有効であれば、これと同等。
そうでなければ、`ranges::copy(rg, back_inserter(c))`。


## 戻り値
なし


## 計算量
`c.append_range(rg)`（または `ranges::copy(rg, back_inserter(c))`）と同じ。


## 例
```cpp example
#include <iostream>
#include <stack>
#include <vector>
 
int main()
{
    std::stack<int> st;
    std::vector<int> vec = {1, 2, 3};

    st.push_range(vec);

    while (!st.empty()) {
        std::cout << st.top() << std::endl;
        st.pop();
    }
}
```
* push_range[color ff0000]
* st.empty()[link empty.md]
* st.top()[link top.md]
* st.pop()[link pop.md]

### 出力
```
3
2
1 
```


## 関連項目

| 名前              | 説明           |
|-------------------|----------------|
| [`push`](push.md) | 要素を追加する |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
