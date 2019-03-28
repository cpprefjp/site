# pool_options
* memory_resource[meta header]
* class[meta id-type]
* std::pmr[meta namespace]
* cpp17[meta cpp]

```cpp
namespace std::pmr {
  class pool_options;
}
```

## 概要
(ここには、クラスの概要を記述します。必須事項です。)

(必要な項目を省略する場合には、「(執筆中)」と書いておいてください。)

## メンバ関数
### 構築・破棄

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| `(constructor)` | コンストラクタ |                |
| `(destructor)`  | デストラクタ   |                |
| `operator=`     | 代入演算子     |                |
| `function_name` | 説明           |                |

## 静的メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
|                 |                |                |
|                 |                |                |
|                 |                |                |
|                 |                |                |
|                 |                |                |

## メンバ型

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
|                 |                |                |
|                 |                |                |
|                 |                |                |
|                 |                |                |
|                 |                |                |

## 非メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
|                 |                |                |
|                 |                |                |
|                 |                |                |
|                 |                |                |
|                 |                |                |

## 例
```cpp example
// (ここには、クラスを解説するための、サンプルコードを記述します。)
// (インクルードとmain()関数を含む、実行可能なサンプルコードを記述してください。そのようなコードブロックにはexampleタグを付けます。)

#include <iostream>

int main()
{
  int variable = 0;
  std::cout << variable << std::endl;
}
```
* variable[color ff0000]

(コードブロック中の識別子に、文字色を付ける例です。)

### 出力
```
0
```

(ここには、サンプルコードの実行結果を記述します。何も出力がない場合は、項目を削除せず、空の出力にしてください。)  
(実行結果が処理系・実行環境によって異なる場合は、項目名を「出力例」に変更し、可能であればその理由も併記してください。)


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6

## 関連項目
(ここには、その機能と関連のあるcpprefjpサイト内の項目へのリンクを記述します。とくに必要がないと判断した場合、項目を削除してください。)


## 参照
[C++1z 多相アロケータとメモリプール - Faith and Brave - C++で遊ぼう ](https://faithandbrave.hateblo.jp/entry/2016/08/08/170454)
[memory_resourceについて - 本の虫](https://cpplover.blogspot.com/2015/09/memoryresource.html)
[Polymorphic Allocator in C++17 - Qita](https://qiita.com/MitsutakaTakeda/items/48980faa9498c46b15b2)
[P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
[P0337r0 | Delete operator= for polymorphic_allocator](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0337r0.html)
[Working Draft, C++ Extensions for Library Fundamentals, Version 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4562.html#memory.resource.synop)