# push_range
* queue[meta header]
* std[meta namespace]
* queue[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
template <container-compatible-range<value_type> R>
void push_range(R&& rg); // C++23
```

## 概要
Range`rg` の各要素を `queue` の末尾に追加する。


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
#include <queue>
#include <vector>
 
int main()
{
    std::queue<int> que;
    std::vector<int> vec = {1, 2, 3};

    que.push_range(vec);

    while (!que.empty()) {
        std::cout << que.front() << std::endl;
        que.pop();
    }
}
```
* push_range[color ff0000]
* que.empty()[link empty.md]
* que.front()[link front.md]
* que.pop()[link pop.md]

### 出力
```
1
2
3
```

## 関連項目

| 名前              | 説明           |
|-------------------|----------------|
| [`push`](push.md) | 要素を追加する |
