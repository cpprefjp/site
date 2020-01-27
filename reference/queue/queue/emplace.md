# emplace
* queue[meta header]
* std[meta namespace]
* queue[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
template <class... Args>
void emplace(Args&&... args);               // C++14 まで

template <class... Args>
decltype(auto) emplace(Args&&... args);     // C++17 から
```

## 概要
要素型 `value_type` のコンストラクタ引数をとり、直接構築で�ューに要素を追加する。


## 効果
- C++14 まで
	```cpp
c.emplace_back(std::forward<Args>(args)...);
```
* std::forward[link /reference/utility/forward.md]

- C++17 から
	```cpp
return c.emplace_back(std::forward<Args>(args)...);
```
* std::forward[link /reference/utility/forward.md]


## 戻り値
- C++14 まで：なし
- C++17 から：構築した要素への参照


## 例
```cpp example
#include <iostream>
#include <queue>
#include <string>
#include <utility>

int main()
{
  std::queue<std::pair<int, std::string>> que;

  que.emplace(3, "aaa");
  que.emplace(1, "bbb");
  que.emplace(4, "ccc");

  while (!que.empty()) {
    std::cout << que.front().first << ", " << que.front().second << std::endl;
    que.pop();
  }
}
```
* emplace[color ff0000]
* que.empty()[link empty.md]
* que.front()[link front.md]
* que.pop()[link pop.md]

### 出力
```
3, aaa
1, bbb
4, ccc
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 

### 備考
C++17 規格が発行された段階では戻り値型が `reference` に変更されていたが、そうしてしまうと `emplace_back` が参照を返さないコンテナと共に使用している既�のコードを破壊してしまうため、規格の誤りとして戻り値型が更に `decltype(auto)` に変更された。


## 関連項目

| 名前              | 説明           |
|-------------------|----------------|
| [`push`](push.md) | 要素を追加する |


## 参照
- [N2680 Proposed Wording for Placement Insert (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2680.pdf)
- [P0084R0 Emplace Return Type](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0084r0.pdf)
- [P0084R1 Emplace Return Type (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0084r1.pdf)
- [P0084R2 Emplace Return Type (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0084r2.pdf)
- [LWG Issue 2783. stack::emplace() and queue::emplace() should return decltype(auto)](https://wg21.cmeerw.net/lwg/issue2783)
