# clear
* unordered_map[meta header]
* std[meta namespace]
* unordered_multimap[meta class]
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


## 計算量
本関数呼び出し前のコンテナの要素数（[`size`](size.md)`()`）に比例

### 計算量に関する備考
- 多くの実装（GCC libstdc++, LLVM libc++ など）は
    1. 全ての要素を走査して各要素を破棄
    2. 全てのバケットを走査して各バケットを初期化

という手順を取るため、実際の実行時間はバケット数 [`bucket_count`](bucket_count.md)`()` について線形となる (`size() <= bucket_count() * `[`max_load_factor()`](max_load_factor.md) = O(`bucket_count()`) であることに注意)。
規格の計算量の要件は要素数 `size()` に線形となっているが、規格がコンテナに対して定義する計算量は「コンテナに格納している要素に対する操作の数の計算量」であるためバケットの走査などを考慮していない。


## 備考
- `clear()` がバケット数([`bucket_count`](bucket_count.md)`()`)を縮小することを規格は要求していない。
実装によっては `clear()` 後もバケット配列が維持され、動的メモリが残る場合がある。
- メモリを確実に解放したいときには以下のように操作を行う
```cpp
std::unordered_multimap<std::string, int> tmp;
s.swap(tmp);
```


## 例
```cpp example
#include <iostream>
#include <unordered_map>

int main()
{
  std::unordered_multimap<std::string, int> um{ {"1st", 1}, {"2nd", 2}, {"3rd", 3}, {"4th", 4}, {"5th", 5}, {"3rd", 33}, };

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

