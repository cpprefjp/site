# clear
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void clear() noexcept;
```

## 概要
コンテナ内のすべての要素を削除する。


## 要件
なし。


## 効果
コンテナ内のすべての要素を削除する。


## 事後条件
[`empty`](empty.md)`() == true`


## 戻り値
なし。


## 例外
投げない。


## 備考
- `clear()` は バケット数([`bucket_count`](bucket_count.md)`()`)を縮小することを規格上は要求していない。
実装によっては `clear()` 後もバケット配列が維持され、動的メモリが残る場合がある。
- メモリを確実に解放したいときには以下のように操作を行う
```CPP
std::unordered_map<std::string, int> tmp;
s.swap(tmp);
```


## 計算量
本関数呼び出し前のコンテナの要素数（[`size`](size.md)`()`）に比例

### 計算量に関する備考
- 多くの実装（GCC libstdc++, LLVM libc++ など）は
    1. 全ての要素を破棄する
    2. 全てのバケットを順に走査して各バケットを初期化

という手順を取るため、実行時間は概ね [`bucket_count`](bucket_count.md)`()` + [`size`](size.md)`()` に比例する傾向がある。  
これは規格が定義する「計算量」（オブジェクトに対する操作の数）とは別物である。


## 例
```cpp example
#include <iostream>
#include <unordered_map>

int main()
{
  std::unordered_map<std::string, int> um{ {"1st", 1}, {"2nd", 2}, {"3rd", 3}, {"4th", 4}, {"5th", 5}, };

  std::cout << std::boolalpha;
  std::cout << um.empty() << std::endl;
  um.clear();
  std::cout << um.empty() << std::endl;
}
```
* clear()[color ff0000]
* um.empty()[link empty.md]

### 出力
```
false
true
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.1 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

## 関連項目

| 名前                                | 説明                                                   |
|-------------------------------------|--------------------------------------------------------|
| [`empty`](empty.md)               | コンテナが空かどうかを判定                             |
| [`emplace`](emplace.md)           | コンテナ内への要素の直接構築                           |
| [`emplace_hint`](emplace_hint.md) | 挿入位置のヒントを使用したコンテナ内への要素の直接構築 |
| [`insert`](insert.md)             | 要素の追加                                             |
| [`erase`](erase.md)               | 要素の削除                                             |
| [`swap`](swap.md)                 | 内容の交換                                             |

