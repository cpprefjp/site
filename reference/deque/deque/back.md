# back
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]

```cpp
reference
  back();           // (1) C++03
constexpr reference
  back();           // (1) C++26

const_reference
  back() const;           // (2) C++03
constexpr const_reference
  back() const;           // (2) C++26
```

## 概要
末尾要素への参照を取得する


## 戻り値
末尾要素への参照


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

  // 末尾要素を取得する
  int& x = c.back();
  std::cout << x << std::endl;
}
```
* back()[color ff0000]

### 出力
```
3
```

## 関連項目

| 名前 | 説明 |
|-------------------------------|----------------------------|
| [`front`](front.md)         | 先頭要素への参照を取得する |
| [`push_back`](push_back.md) | 末尾に要素を追加する |
| [`pop_back`](pop_back.md)   | 末尾要素を削除する |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
