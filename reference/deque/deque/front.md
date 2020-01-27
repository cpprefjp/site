# front
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]

```cpp
reference front();
const_reference front() const;
```

## 概要
先�要素への参照を取得する


## 戻り値
先�要素への参照


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

  // 先�要素を取得する
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
| [`push_front`](push_front.md) | 先�に要素を追加する |
| [`pop_front`](pop_front.md)   | 先�要素を削除する |


