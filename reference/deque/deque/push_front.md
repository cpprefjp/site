# push_front
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]

```cpp
void push_front(const T& x); // (1)
void push_front(T&& y);      // (2) C++11
```

## 概要
先�に要素を追加する。


## 効果
- (1) : `x`のコピーを先�に追加する
- (2) : 一時オブジェクト`x`を移動して先�に追加する


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
  std::string s = "world";
  c.push_front(s);

  // &&バージョン
  c.push_front(std::string("hello"));

  for (auto x : c) {
    std::cout << x << std::endl;
  }
}
```
* push_front[color ff0000]

### 出力
```
hello
world
```

## 関連項目

| 名前 | 説明 |
|-------------------------------|----------------------|
| [`push_back`](push_back.md) | 末尾に要素を追加する |
| [`pop_front`](pop_front.md) | 先�要素を削除する |
| [`insert`](insert.md)       | 任意の位置に要素を挿入する |


## 参照
- [LWG Issue 2252. Strong guarantee on `vector::push_back()` still broken with C++11?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2252)
    - 経緯の説明は、[`vector::push_back()`](/reference/vector/vector/push_back.md)ページを参照。

