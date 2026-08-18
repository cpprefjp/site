# push_range
* queue[meta header]
* std[meta namespace]
* priority_queue[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
template <container-compatible-range<value_type> R>
void push_range(R&& rg);           // (1) C++23
template <container-compatible-range<value_type> R>
constexpr void push_range(R&& rg); // (1) C++26
```

## 概要
Range`rg` の各要素を `priority_queue` に追加し、優先順に並べ替えを行う。


## 効果
まず `c` に `rg` の要素を追加する。`c.append_range(forward<R>(rg))` が有効であれば、これで要素を追加する。そうでなければ、`ranges::copy(rg, back_inserter(c))` で要素を追加する。

次に、`make_heap(c.begin(), c.end(), comp)` で優先順に並べ替えを行う。


## 戻り値
なし


## 例
```cpp example
#include <iostream>
#include <queue>
#include <vector>
 
int main()
{
    std::priority_queue<int> que;
    std::vector<int> vec = {2, 1, 3};

    que.push_range(vec);

    while (!que.empty()) {
        std::cout << que.top() << std::endl;
        que.pop();
    }
}
```
* push_range[color ff0000]
* que.empty()[link empty.md]
* que.top()[link top.md]
* que.pop()[link pop.md]

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
- [LWG Issue 3723. `priority_queue::push_range` needs to `append_range`](https://cplusplus.github.io/LWG/issue3723)
    - C++23で、効果が`c.append_range(rg)`を利用して要素を追加し`make_heap`でヒープ性を回復する形に明確化された
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
