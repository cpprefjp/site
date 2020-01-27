# push_back
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]

```cpp
void push_back(const T& x); // (1)
void push_back(T&& y);      // (2) C++11
```

## 概要
末尾に要素を追加する。


## 効果
- (1) : `x`のコピーを末尾に追加する
- (2) : 一時オブジェクト`x`を移動して末尾に追加する


## 戻り値
なし


## 計算量
定数時間


## 備考
操作�に例外が発生した場合、副作用は発生しない。


## 例
```cpp example
#include <iostream>
#include <deque>
#include <string>

int main()
{
  std::deque<std::string> c;

  // const&バージョン
  std::string s = "hello";
  c.push_back(s);

  // &&バージョン
  c.push_back(std::string("world"));

  for (auto x : c) {
    std::cout << x << std::endl;
  }
}
```
* push_back[color ff0000]

### 出力
```
hello
world
```

## 関連項目

| 名前 | 説明 |
|-------------------------------------|--------------------------------|
| [`emplace_back`](emplace_back.md) | 末尾に要素を直接構築で追加する |
| [`push_front`](push_front.md)     | 先�に要素を追加する |
| [`insert`](insert.md)             | 任意の位置に要素を挿入する |


## 参照
- [LWG Issue 2252. Strong guarantee on `vector::push_back()` still broken with C++11?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2252)
    - 経緯の説明は、[`vector::push_back()`](/reference/vector/vector/push_back.md)ページを参照。

