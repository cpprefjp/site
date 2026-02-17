# front
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]

```cpp
reference front();           // (1) C++03
constexpr reference front(); // (1) C++26

const_reference front() const;           // (2) C++03
constexpr const_reference front() const; // (2) C++26
```

## 概要
先頭要素への参照を取得する


## 戻り値
先頭要素への参照


## 計算量
定数時間


## 備考
コンテナが空の状態でこの関数が呼ばれた場合、動作は未規定。


## 例
```cpp example
#include <iostream>
#include <deque>

int main()
{
  std::deque<int> c = {1, 2, 3};

  // 先頭要素を取得する
  int& x = c.front();
  std::cout << x << std::endl;
}
```
* front[color ff0000]

### 出力
```
1
```

## 関連項目

| 名前 | 説明 |
|-------------------------------|----------------------------|
| [`back`](back.md)             | 末尾要素への参照を取得する |
| [`push_front`](push_front.md) | 先頭に要素を追加する |
| [`pop_front`](pop_front.md)   | 先頭要素を削除する |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
